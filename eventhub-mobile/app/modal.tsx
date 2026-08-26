import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, Stack } from 'expo-router';

export default function ModalScreen() {
  const params = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Detalii eveniment',
        }}
      />

      <Text style={styles.title}>{params.title}</Text>

      <Text style={styles.info}>📍 {params.city}</Text>
      <Text style={styles.info}>📅 {params.date}</Text>
      <Text style={styles.info}>🏷️ {params.category}</Text>
      <Text style={styles.price}>{params.price} lei</Text>
      <Text style={styles.descriptionTitle}>Descriere</Text>

      <Text style={styles.description}>
        {params.description || 'Nu există o descriere pentru acest eveniment.'}
      </Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  info: {
    fontSize: 18,
    marginBottom: 14,
  },

  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },

  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 8,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});