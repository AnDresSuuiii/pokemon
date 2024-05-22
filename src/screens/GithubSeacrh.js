import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TextInput, Button, Image } from 'react-native';
import axios from 'axios';

export default function GitHubScreen() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const responseUsuario = await axios.get(`https://api.github.com/users/${usuario}`);
      const responseRepos = await axios.get(`https://api.github.com/users/${usuario}/repos`);

      setRepos(responseRepos.data);
      setAvatarUrl(responseUsuario.data.avatar_url);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error al obtener la información:', error);
      setLoading(false);
      setError('Usuario no encontrado');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre de usuario de GitHub"
        value={usuario}
        onChangeText={setUsuario}
      />
      <Button title="Buscar" onPress={fetchData} />
      {avatarUrl && <Image style={styles.avatar} source={{ uri: avatarUrl }} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={repos}
          renderItem={({ item }) => (
            <View style={styles.repoItem}>
              <Text style={styles.repoName}>{item.name}</Text>
              <Text style={styles.repoDescription}>{item.description}</Text>
            </View>
          )}
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
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  repoItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  repoName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  repoDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  loading: {
    marginTop: 20,
  },
});
