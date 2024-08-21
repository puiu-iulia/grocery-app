import { Text, StyleSheet, Pressable } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';

import { GroceryItem } from '@/models/GroceryItem';

interface GroceryListItemProps {
  item: GroceryItem;
  onPress: () => void;
  onDelete: () => void;
}

export function GroceryListItem( { item, onPress, onDelete }: GroceryListItemProps) {
  return (
    <Pressable style={styles.groceryItemContainer} onLongPress={onDelete}>
      <Text
        style={styles.groceryItemText}
      >{item.name}</Text>
      <Pressable 
        onPress={onPress} 
        style={styles.checkboxContainer}
      >
        <Fontisto name={item.isPurchased ? "checkbox-active" : "checkbox-passive"} size={24} color="#CCCCCC" />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  groceryItemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#CCCCCC',
    borderWidth: 0.5,
    borderRadius: 4,
    marginBottom: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
  },
  groceryItemText: {
    color: 'black',
    fontSize: 16,
    padding: 8,
  },
  checkboxContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  }
});