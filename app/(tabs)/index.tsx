import { StyleSheet, Text, View, Linking, Vibration, TouchableOpacity, Animated } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { useEffect, useState, useRef } from 'react';

export default function HomeScreen() {
  const [data, setData] = useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<any>(null);
  const [shakeCount, setShakeCount] = useState(0);

  const lastShake = useRef(0); // cooldown tracker
  const barAnim = useRef(new Animated.Value(0)).current; // animirani bar

  const startSensor = () => {
    if (subscription) return;

    const sub = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);

      const currentSpeed = Math.sqrt(
        accelerometerData.x ** 2 +
        accelerometerData.y ** 2 +
        accelerometerData.z ** 2
      );

      // animacija motion bara
      const barValue = Math.min(currentSpeed / 4, 1); // scale 0-1
      Animated.timing(barAnim, {
        toValue: barValue,
        duration: 100,
        useNativeDriver: false,
      }).start();

      // shake trigger kada bar pun (>=0.99) i cooldown 500ms
      const now = Date.now();
      if (barValue >= 0.99 && now - lastShake.current > 500) {
        setShakeCount(prev => prev + 1);
        lastShake.current = now;
        Vibration.vibrate(150);
      }
    });

    setSubscription(sub);
  };

  const stopSensor = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const resetValues = () => {
    setData({ x: 0, y: 0, z: 0 });
    setShakeCount(0);
    barAnim.setValue(0);
  };

  useEffect(() => {
    Accelerometer.setUpdateInterval(150);
    return () => stopSensor();
  }, []);

  const barHeight = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150], // maksimalna visina bara
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motion Tracker</Text>

      <Text style={styles.text}>X: {(data.x * 10).toFixed(1)}</Text>
      <Text style={styles.text}>Y: {(data.y * 10).toFixed(1)}</Text>
      <Text style={styles.text}>Z: {(data.z * 10).toFixed(1)}</Text>

      <Text style={styles.text}>Shake Count: {shakeCount}</Text>

      {/* Motion Bar */}
      <View style={styles.barContainer}>
        <Animated.View style={[styles.bar, { height: barHeight }]} />
      </View>

      <View style={styles.buttons}>
        {!subscription && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.button, styles.startButton]}
            onPress={startSensor}
          >
            <Text style={styles.buttonText}>Start Sensor</Text>
          </TouchableOpacity>
        )}
        {subscription && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.button, styles.stopButton]}
            onPress={stopSensor}
          >
            <Text style={styles.buttonText}>Stop Sensor</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.button, styles.resetButton]}
          onPress={resetValues}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f2f3f',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: 'white',
    marginBottom: 20,
  },
  text: {
    fontSize: 22,
    color: 'white',
    marginVertical: 4,
  },
  buttons: {
    marginVertical: 20,
    gap: 10,
    width: '60%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  resetButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#4da6ff',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  barContainer: {
    width: 40,
    height: 150,
    backgroundColor: '#555',
    marginVertical: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    backgroundColor: '#4CAF50',
    position: 'absolute',
    bottom: 0,
  },
});
