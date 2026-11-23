import mqtt, { MqttClient } from 'mqtt';

export interface SyncPayload {
  type: 'START' | 'STOP' | 'REARM' | 'INIT' | 'HEARTBEAT';
  id?: string;
  hasStarted: boolean;
  isRunning: boolean;
  animateBirth?: boolean;
  targetEpoch?: number;
  remainingSeconds?: number;
  sentAt?: number;
}

const TOPIC = 'dataxscape2k26/production/countdown_v2';
const BROKERS = [
  'wss://broker.emqx.io:8084/mqtt',
  'wss://broker.hivemq.com:8884/mqtt',
];

type SyncListener = (payload: SyncPayload) => void;
type StatusListener = (connected: boolean) => void;

class CountdownSyncService {
  private client: MqttClient | null = null;
  private listeners: Set<SyncListener> = new Set();
  private statusListeners: Set<StatusListener> = new Set();
  private isConnecting = false;
  private currentBrokerIdx = 0;
  private lastHandledActionId = '';
  public isConnected = false;
  private clientId = 'dataxscape_' + (typeof window !== 'undefined' ? (window.location.hash.replace('#', '') || 'stage') : 'node') + '_' + Math.random().toString(16).substring(2, 8);

  constructor() {
    if (typeof window !== 'undefined') {
      this.connect();
    }
  }

  public getStatus(): boolean {
    return Boolean(this.client?.connected);
  }

  public onStatusChange(listener: StatusListener): () => void {
    this.statusListeners.add(listener);
    listener(this.getStatus());
    return () => {
      this.statusListeners.delete(listener);
    };
  }

  private notifyStatus(connected: boolean) {
    this.isConnected = connected;
    this.statusListeners.forEach((l) => {
      try {
        l(connected);
      } catch (e) {
        console.warn('Status listener error:', e);
      }
    });
  }

  public connect() {
    if (this.client?.connected || this.isConnecting) return;
    this.isConnecting = true;

    const brokerUrl = BROKERS[this.currentBrokerIdx % BROKERS.length];
    console.log(`[CountdownSync] Connecting to cloud broker: ${brokerUrl}`);

    try {
      this.client = mqtt.connect(brokerUrl, {
        clientId: this.clientId,
        clean: true,
        connectTimeout: 8000,
        reconnectPeriod: 3000,
      });

      this.client.on('connect', () => {
        console.log(`[CountdownSync] Connected to ${brokerUrl}`);
        this.isConnecting = false;
        this.notifyStatus(true);

        this.client?.subscribe(TOPIC, { qos: 1 }, (err) => {
          if (err) {
            console.warn('[CountdownSync] Subscribe error:', err);
          } else {
            console.log(`[CountdownSync] Subscribed to topic: ${TOPIC}`);
          }
        });
      });

      this.client.on('message', (_topic, message) => {
        try {
          const raw = message.toString();
          const payload = JSON.parse(raw) as SyncPayload;
          
          // Deduplicate if we already handled this action ID locally
          if (payload.id && payload.id === this.lastHandledActionId) {
            return;
          }

          this.listeners.forEach((listener) => {
            try {
              listener(payload);
            } catch (err) {
              console.error('[CountdownSync] Listener error:', err);
            }
          });
        } catch (err) {
          console.warn('[CountdownSync] Message parse note:', err);
        }
      });

      this.client.on('error', (err) => {
        console.warn('[CountdownSync] MQTT error:', err);
        this.isConnecting = false;
        this.notifyStatus(false);
      });

      this.client.on('close', () => {
        this.isConnecting = false;
        this.notifyStatus(false);
      });

      this.client.on('offline', () => {
        this.isConnecting = false;
        this.notifyStatus(false);
        // Rotate to fallback broker on disconnection
        this.currentBrokerIdx++;
      });
    } catch (err) {
      console.warn('[CountdownSync] Connection attempt note:', err);
      this.isConnecting = false;
      this.notifyStatus(false);
    }
  }

  public subscribe(listener: SyncListener): () => void {
    this.listeners.add(listener);
    if (!this.client?.connected) {
      this.connect();
    }
    return () => {
      this.listeners.delete(listener);
    };
  }

  public publish(payload: SyncPayload) {
    const actionId = payload.id || `${payload.type}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    payload.id = actionId;
    payload.sentAt = Date.now();
    this.lastHandledActionId = actionId;

    const json = JSON.stringify(payload);

    if (this.client?.connected) {
      this.client.publish(TOPIC, json, { qos: 1, retain: true }, (err) => {
        if (err) {
          console.warn('[CountdownSync] Publish note:', err);
        } else {
          console.log('[CountdownSync] Published retained payload:', payload.type);
        }
      });
    } else {
      // Reconnect and publish
      this.connect();
      setTimeout(() => {
        if (this.client?.connected) {
          this.client.publish(TOPIC, json, { qos: 1, retain: true });
        }
      }, 1000);
    }
  }
}

export const countdownSync = new CountdownSyncService();
