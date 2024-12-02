import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { firestore, auth } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EventDetailScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const eventRef = doc(firestore, 'events', eventId);
        const eventSnapshot = await getDoc(eventRef);
        if (eventSnapshot.exists()) {
          setEvent(eventSnapshot.data());
          setTitle(eventSnapshot.data().title);
          setDescription(eventSnapshot.data().description);
        }
      } catch (error) {
        console.error("Error fetching event details");
      }
    };

    getEventDetails();
  }, [eventId]);

  const handleUpdateEvent = async () => {
    try {
      const eventRef = doc(firestore, 'events', eventId);
      await updateDoc(eventRef, { title, description });
      navigation.goBack(); 
    } catch (error) {
      console.error("Error updating event ");
    }
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Update Event" onPress={handleUpdateEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
});

export default EventDetailScreen;
