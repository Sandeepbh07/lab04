import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { firestore, auth } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const CreateEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateEvent = async () => {
    if (title && description) {
      try {
        await addDoc(collection(firestore, 'events'), {
          title,
          description,
          userId: auth.currentUser.uid,
          favourites: []
        });
        navigation.goBack();
      } catch (error) {
        console.error("Error adding event ");
      }
    } else {
      alert('Please fill out all fields');
    }
  };

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
      <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
        <MaterialIcons name="add-circle" size={50} color="green" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
  createButton: { marginTop: 20, alignSelf: 'center' }
});

export default CreateEventScreen;
