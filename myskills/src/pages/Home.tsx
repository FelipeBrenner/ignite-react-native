import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import {Button} from '../components/Button';
import {CardSkill} from '../components/CardSkill';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greetings, setGreetings] = useState('');

  const handleNewAddSkill = () => {
    if (newSkill) {
      const data = {
        id: String(new Date().getTime()),
        name: newSkill,
      };

      setMySkills(oldState => [...oldState, data]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (id: string) => {
    setMySkills(oldState => oldState.filter(skill => skill.id !== id));
  };

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreetings('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreetings('Good afternoon');
    } else {
      setGreetings('Good night');
    }
  }, [mySkills]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} testID="welcome">
        Welcome, Brenner
      </Text>
      <Text style={styles.greetings}>{greetings}</Text>

      <TextInput
        value={newSkill}
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button title="Add" onPress={handleNewAddSkill} />

      <Text style={[styles.title, {marginVertical: 30}]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CardSkill
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
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
  greetings: {
    color: '#fff',
  },
});
