import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, firestore } from '../firebaseConfig'; 
import { MaterialIcons } from 'react-native-vector-icons';
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'; 

const EventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    if (user) {
      const eventsQuery = query(
        collection(firestore, 'events'),
        where('userId', '==', user.uid) 
      );
      
      const unsubscribeEvents = onSnapshot(eventsQuery, (querySnapshot) => {
        const eventList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventList); 
      });
      
      return () => unsubscribeEvents(); 
    }
  }, [user]);

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(firestore, 'events', eventId));
    } catch (error) {
      console.error("Error deleting event");
    }
  };

  const handleAddToFavorites = async (eventId) => {
    try {
      const eventRef = doc(firestore, 'events', eventId);
      await updateDoc(eventRef, {
        favourites: arrayUnion(user.uid) 
      });
    } catch (error) {
      console.error("Error adding to favorites ");
    }
  };

  const isFavorited = (event) => {
    return event.favourites && event.favourites.includes(user?.uid); 
  };

  return (
    <View style={styles.container}>
      {user ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <Text style={styles.eventText}>{item.title}</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}>
                  <MaterialIcons name="edit" size={30} color="blue" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
                  <MaterialIcons name="delete" size={30} color="red" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => !isFavorited(item) && handleAddToFavorites(item.id)}
                  disabled={isFavorited(item)} 
                >
                  <MaterialIcons
                    name={isFavorited(item) ? "favorite" : "favorite-border"}
                    size={30}
                    color={isFavorited(item) ? "orange" : "gray"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>Please log in to view events.</Text>
      )}
      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateEvent')}>
        <MaterialIcons name="add-circle" size={50} color="green" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  eventItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  eventText: { fontSize: 18 },
  iconContainer: { flexDirection: 'row', gap: 15 },
  createButton: { marginTop: 20, alignSelf: 'center' }
});

export default EventListScreen;
