import React, { useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import { Friend } from "./Friend";

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
    online: string;
  }[];
  unfollow: () => void;
}

export function FriendList({ data, unfollow }: Props) {
  const totalLikes = useMemo(() => {
    return data.reduce((likes, friend) => {
      return likes + friend.likes;
    }, 0);
  }, [data]);

  return (
    <View>
      <Text style={{ marginBottom: 10 }}>Total de likes: {totalLikes}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Friend data={item} unfollow={unfollow} />}
      />
    </View>
  );
}
