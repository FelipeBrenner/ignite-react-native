import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export function CardSkill({skill}) {
  return (
    <TouchableOpacity style={styles.buttonSkill}>
      <Text style={styles.textSkill}>{skill}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSkill: {
    backgroundColor: '#1f1e25',
    padding: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  textSkill: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
