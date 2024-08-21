import { useState, useCallback } from 'react';
import { Image, StyleSheet, TextInput, View, Pressable, FlatList, Text, Platform, SectionList } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRealm, useUser, useQuery } from '@realm/react';

import { GroceryItem } from '@/models/GroceryItem';
import { GroceryListItem} from '@/components/GroceryItem';

export default function HomeScreen() {

  const realm = useRealm();
  const user = useUser();

  const [groceryName, setGroceryName] = useState('');

  const createGroceryItem = () => {
    realm.write(() => {
        realm.create(GroceryItem, {
            name: groceryName,
            user_id: user.id,
        });
    });
    setGroceryName('');
  }

  const updateGroceryItem = (item: GroceryItem) => {
    realm.write(() => {
      item.isPurchased = !item.isPurchased;
    });
  }

  const deleteGroceryItem = (item: GroceryItem) => {
    realm.write(() => {
      realm.delete(item);
    });
  }

  const groceryItems = useQuery(GroceryItem).filtered('user_id = $0', user.id).sorted('createdAt', true);

  return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Groceries</Text>
        </View>
        <View style={styles.groceryContainer}>
          <TextInput 
            placeholder="Item Name"
            value={groceryName}
            onChangeText={setGroceryName}
            style={styles.nameContainer}
            onSubmitEditing={createGroceryItem}
          />
          <Pressable style={styles.plusIcon} onPress={createGroceryItem} disabled={!groceryName}>
            <FontAwesome6 name="basket-shopping" size={32} color={"#C1FF72"} />
          </Pressable>
        </View>
        <SectionList 
          sections={[
            {
              title: "Items to Purchase",
              data: groceryItems.filter((item) => !item.isPurchased)
            },
            {
              title: "Purchased Items",
              data: groceryItems.filter((item) => item.isPurchased)
            }
          ]}
          renderItem={({ item }) => (
            <GroceryListItem 
              item={item} 
              onDelete={() => deleteGroceryItem(item)}
              onPress={() => updateGroceryItem(item)}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  groceryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    backgroundColor: '#000',
    marginBottom: 16,
    padding: 8,
    borderTopColor: 'white',
    borderTopWidth: 2,
  },
  header: {
    backgroundColor: 'black',
    height: 80,
  },
  sectionHeader: {
    color: '#505050',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 8,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 80,
    paddingTop: Platform.OS === 'ios' ? 16 : 0,
  },
  nameContainer: {
    gap: 8,
    width: '87%',
    borderColor: 'gray',
    borderWidth: 0.5,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 8,
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  plusIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  }
});
