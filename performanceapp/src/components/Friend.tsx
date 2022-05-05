import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
    online: string;
  };
  unfollow: () => void;
}

function FriendComponent({ data, unfollow }: Props) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text>
        {data.name} - Likes: {data.likes}
      </Text>

      <TouchableOpacity onPress={unfollow}>
        <Text>Deixar de seguir</Text>
      </TouchableOpacity>

      <Text>{data.online}</Text>
    </View>
  );
}

export const Friend = memo(FriendComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.data, nextProps.data);
});
