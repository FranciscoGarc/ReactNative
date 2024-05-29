import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator } from 'react-native';

const UserItem = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{item.name}</Text>
    <Text style={styles.subtitle}>{item.email}</Text>
    <Text style={styles.description}>{item.address.street}, {item.address.city}</Text>
  </View>
);

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching user data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre"
        onChangeText={text => setSearchTerm(text)}
        value={searchTerm}
      />
      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={({ item }) => <UserItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  list: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    margin: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  input: {
    width: '90%',
    backgroundColor: '#dfd7d7',
    height: 50,
    fontWeight: '900',
    borderRadius: 5,
    margin: 10,
    padding: 10,
    fontSize: 18,
  },
  loading: {
    marginTop: 20,
  },
});
