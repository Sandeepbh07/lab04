import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { firestore, auth } from '../firebaseConfig';
import { MaterialIcons } from 'react-native-vector-icons';
import { collection, query, where, onSnapshot, updateDoc, doc, arrayRemove } from 'firebase/firestore'; 

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const favoriteQuery = query(
        collection(firestore, 'events'),
        where('favourites', 'array-contains', user.uid)
      );
      const unsubscribeFavorites = onSnapshot(favoriteQuery, (querySnapshot) => {
        const favoriteList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavorites(favoriteList);
      });
      return () => unsubscribeFavorites();
    }
  }, [user]);

  const handleRemoveFromFavorites = async (eventId) => {
    try {
      const eventRef = doc(firestore, 'events', eventId);
      await updateDoc(eventRef, {
        favourites: arrayRemove(user.uid), 
      });
    } catch (error) {
      console.error('Error removing from favorites: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventText}>{item.title}</Text>
            <TouchableOpacity onPress={() => handleRemoveFromFavorites(item.id)}>
              <MaterialIcons name="favorite" size={30} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  eventItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  eventText: { fontSize: 18 },
});

export default FavoritesScreen;
