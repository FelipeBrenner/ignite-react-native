import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import {ButtonAdd} from '../components/ButtonAdd';
import {CardSkill} from '../components/CardSkill';

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState([]);

  const handleNewAddSkill = () => {
    setMySkills(oldState => [...oldState, newSkill]);
    setNewSkill('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome, Brenner</Text>

      <TextInput
        value={newSkill}
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <ButtonAdd onPress={handleNewAddSkill} />

      <Text style={[styles.title, {marginVertical: 30}]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item}
        renderItem={({item}) => <CardSkill skill={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 50,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
});
