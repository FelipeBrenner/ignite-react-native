import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface CardSkillProps extends TouchableOpacityProps {
  skill: string;
}

export function CardSkill({skill, ...rest}: CardSkillProps) {
  return (
    <TouchableOpacity style={styles.buttonSkill} {...rest}>
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
