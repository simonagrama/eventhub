import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HomeScreen() {
  const [events, setEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
    async function loadEvents() {
    const savedEvents = await AsyncStorage.getItem('events');

    if (savedEvents && JSON.parse(savedEvents).length > 0) {
      setEvents(JSON.parse(savedEvents));
    } else {
      setEvents([
        {
          id: 1,
          title: 'Rock Festival',
          city: 'Brașov',
          date: '25 septembrie 2026',
          category: 'Muzică',
          price: 150,
          description:
            'Un festival de muzică rock dedicat iubitorilor de concerte live.',
        },
        {
          id: 2,
          title: 'Tech Conference',
          city: 'Brașov',
          date: '10 octombrie 2026',
          category: 'Tehnologie',
          price: 100,
          description:
            'O conferință dedicată tehnologiei, inovației și celor mai noi tendințe IT.',
        },
        {
          id: 3,
          title: 'Jazz Night',
          city: 'Brașov',
          date: '3 noiembrie 2026',
          category: 'Muzică',
          price: 80,
          description:
            'O seară relaxantă dedicată muzicii jazz, cu artiști talentați și muzică live.',
        },
      ]);
    }

    setIsLoaded(true);
  }

  loadEvents();
}, []);


    useEffect(() => {
      if (isLoaded) {
        AsyncStorage.setItem('events', JSON.stringify(events));
      }
    }, [events, isLoaded]);

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [eventBeingEdited, setEventBeingEdited] = useState(null);

  function deleteEvent(id: number) {
    setEvents(function (currentEvents) {
      return currentEvents.filter(function (event) {
        return event.id !== id;
      });
    });
  }
    
    function parseRomanianDate(dateString: string) {
      const months: { [key: string]: number } = {
        ianuarie: 0,
        februarie: 1,
        martie: 2,
        aprilie: 3,
        mai: 4,
        iunie: 5,
        iulie: 6,
        august: 7,
        septembrie: 8,
        octombrie: 9,
        noiembrie: 10,
        decembrie: 11,
      };

      const parts = dateString.split(' ');

      if (parts.length !== 3) {
        return new Date();
      }

      const day = Number(parts[0]);
      const month = months[parts[1].toLowerCase()];
      const year = Number(parts[2]);

      return new Date(year, month, day);
    }

    function editEvent(event) {
      setEventBeingEdited(event);

      setTitle(event.title);
      setCity(event.city);
      setDate(event.date);
      setSelectedDate(parseRomanianDate(event.date));
      setCategory(event.category);
      setPrice(event.price.toString());
      setDescription(event.description || '');
    }

function addEvent() {
  if (title.trim().length < 3) {
    alert('Titlul trebuie să aibă cel puțin 3 caractere.');
    return;
  }

  if (city.trim().length < 2) {
    alert('Introdu un oraș valid.');
    return;
  }

  if (!date.trim()) {
    alert('Introdu data evenimentului.');
    return;
  }

  if (!category.trim()) {
    alert('Introdu categoria.');
    return;
  }

  if (!price || Number(price) < 0) {
    alert('Introdu un preț valid.');
    return;
  }

  if (description.trim().length < 10) {
    alert('Descrierea trebuie să aibă cel puțin 10 caractere.');
    return;
  }

  if (eventBeingEdited !== null) {
    setEvents(function (currentEvents) {
      return currentEvents.map(function (event) {
        if (event.id === eventBeingEdited.id) {
          return {
            ...event,
            title: title,
            city: city,
            date: date,
            category: category,
            price: Number(price),
            description: description,
          };
        }

        return event;
      });
    });

    setEventBeingEdited(null);
  } else {
    const newEvent = {
      id: Date.now(),
      title: title,
      city: city,
      date: date,
      category: category,
      price: Number(price),
      description: description,
    };

    setEvents(function (currentEvents) {
      return [...currentEvents, newEvent];
    });
  }

  setTitle('');
  setCity('');
  setDate('');
  setCategory('');
  setPrice('');
  setDescription('');
}
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>EventHub</Text>

      <TextInput
        style={styles.input}
        placeholder="Titlul evenimentului"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Oraș"
        value={city}
        onChangeText={setCity}
      />

        <Pressable
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {date || '📅 Alege data'}
          </Text>
        </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);

            if (selectedDate) {
              const formattedDate = selectedDate.toLocaleDateString('ro-RO', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              });

              setDate(formattedDate);
            }
          }}
        />
      )}

      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Alege categoria" value="" />
        <Picker.Item label="Muzică" value="Muzică" />
        <Picker.Item label="Tehnologie" value="Tehnologie" />
        <Picker.Item label="Sport" value="Sport" />
        <Picker.Item label="Artă" value="Artă" />
        <Picker.Item label="Educație" value="Educație" />
        <Picker.Item label="Altele" value="Altele" />
      </Picker>
    </View>

      <TextInput
      style={styles.input}
      placeholder="Preț"
      value={price}
      onChangeText={setPrice}
      keyboardType="numeric"
    />

    <TextInput
      style={styles.descriptionInput}
      placeholder="Descrierea evenimentului"
      value={description}
      onChangeText={setDescription}
      multiline
      numberOfLines={4}
    />

      <Pressable
        style={styles.addButton}
        onPress={addEvent}
      >
        <Text style={styles.addButtonText}>
          {eventBeingEdited ? 'Salvează modificările' : 'Adaugă eveniment'}
        </Text>
      </Pressable>

      <Text style={styles.subtitle}>Descoperă evenimente</Text>

      {events.map((event) => (
        <View style={styles.card} key={event.id}>
          <Text style={styles.eventTitle}>{event.title}</Text>

          <Text style={styles.info}>📍 {event.city}</Text>
          <Text style={styles.info}>📅 {event.date}</Text>
          <Text style={styles.info}>🏷️ {event.category}</Text>
          <Text style={styles.price}>{event.price} lei</Text>
          <Text style={styles.description}>
            {event.description}
          </Text>

          <Link
            href={{
              pathname: '/modal',
              params: {
                title: event.title,
                city: event.city,
                date: event.date,
                category: event.category,
                price: event.price.toString(),
                description: event.description || '',
              },
            }}
            asChild
          >
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Vezi evenimentul</Text>
            </Pressable>
          </Link>

          <Pressable
            style={styles.editButton}
            onPress={() => editEvent(event)}
          >
            <Text style={styles.editButtonText}>Editează</Text>
          </Pressable>

          <Pressable
            style={styles.deleteButton}
            onPress={() => deleteEvent(event.id)}
          >
            <Text style={styles.deleteButtonText}>Șterge</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },

  eventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
  },

  info: {
    fontSize: 16,
    marginBottom: 8,
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },

  button: {
  backgroundColor: '#2563eb',
  padding: 12,
  borderRadius: 8,
  marginTop: 14,
  alignItems: 'center',
},

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },

  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },

    pickerContainer: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginBottom: 16,
      overflow: 'hidden',
  },

  addButton: {
    backgroundColor: '#16a34a',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  editButton: {
    backgroundColor: '#f59e0b',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },

  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  descriptionInput: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },

  description: {
    fontSize: 15,
    color: '#555',
    marginTop: 10,
    lineHeight: 22,
  },

  dateButton: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
  },

  dateButtonText: {
    fontSize: 16,
    color: '#555555',
  },

});