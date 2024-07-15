import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, PanResponder, Animated } from 'react-native';

const tops = [
  require('./assets/top1.png'),
  require('./assets/top2.png'),
  require('./assets/top3.png'),
];
const bottoms = [
  require('./assets/bottom1.png'),
  require('./assets/bottom2.png'),
  require('./assets/bottom3.png'),
];
const footwear = [
  require('./assets/footwear1.png'),
  require('./assets/footwear2.png'),
  require('./assets/footwear3.png'),
];
const dress = [
  require('./assets/dress1.png'),
  require('./assets/dress2.png'),
  require('./assets/dress3.png'),
];
const bag = [
  require('./assets/bag1.png'),
  require('./assets/bag2.png'),
  require('./assets/bag3.png'),
];
const accessories = [
  require('./assets/accessory1.png'),
  require('./assets/accessory2.png'),
  require('./assets/accessory3.png'),
];

const AvatarCustomization = () => {
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [selectedFootwear, setSelectedFootwear] = useState(null);
  const [selectedDress, setSelectedDress] = useState(null);
  const [selectedBag, setSelectedBag] = useState(null);
  const [selectedAccessories, setSelectedAccessories] = useState(null);
  const [activeTab, setActiveTab] = useState('tops');

  const topPosition = useRef(new Animated.ValueXY()).current;
  const bottomPosition = useRef(new Animated.ValueXY()).current;
  const footwearPosition = useRef(new Animated.ValueXY()).current;
  const dressPosition = useRef(new Animated.ValueXY()).current;
  const bagPosition = useRef(new Animated.ValueXY()).current;
  const accessoriesPosition = useRef(new Animated.ValueXY()).current;

  const topScale = useRef(new Animated.Value(1)).current;
  const bottomScale = useRef(new Animated.Value(1)).current;
  const footwearScale = useRef(new Animated.Value(1)).current;
  const dressScale = useRef(new Animated.Value(1)).current;
  const bagScale = useRef(new Animated.Value(1)).current;
  const accessoriesScale = useRef(new Animated.Value(1)).current;

  const createPanResponder = (position, scale) => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
        position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (event, gesture) => {
        if (gesture.numberActiveTouches === 1) {
          Animated.event(
            [null, { dx: position.x, dy: position.y }],
            { useNativeDriver: false }
          )(event, gesture);
        } else if (gesture.numberActiveTouches === 2) {
          const touches = event.nativeEvent.touches;
          const dx = touches[0].pageX - touches[1].pageX;
          const dy = touches[0].pageY - touches[1].pageY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (scale._value === 1) {
            scale.setOffset(scale._value);
            scale.setValue(1);
          }
          scale.setValue(distance / 200); // Adjust scaling factor as needed
        }
      },
      onPanResponderRelease: () => {
        position.flattenOffset();
      },
    });
  };

  const topPanResponder = createPanResponder(topPosition, topScale);
  const bottomPanResponder = createPanResponder(bottomPosition, bottomScale);
  const footwearPanResponder = createPanResponder(footwearPosition, footwearScale);
  const dressPanResponder = createPanResponder(dressPosition, dressScale);
  const bagPanResponder = createPanResponder(bagPosition, bagScale);
  const accessoriesPanResponder = createPanResponder(accessoriesPosition, accessoriesScale);

  const renderOptions = (options, setSelected) => {
    return (
      <ScrollView horizontal>
        {options.map((option, index) => (
          <TouchableOpacity key={index} onPress={() => setSelected(option)}>
            <Image source={option} style={styles.optionImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const increaseSize = (scale) => {
    Animated.timing(scale, {
      toValue: scale._value + 0.1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const decreaseSize = (scale) => {
    Animated.timing(scale, {
      toValue: scale._value - 0.1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={require('./assets/avatar_base.png')} style={styles.avatar} />
        {selectedTop && (
          <Animated.Image
            source={selectedTop}
            style={[styles.clothing, styles.top, topPosition.getLayout(), { transform: [{ scale: topScale }] }]}
            {...topPanResponder.panHandlers}
          />
        )}
        {selectedBottom && (
          <Animated.Image
            source={selectedBottom}
            style={[styles.clothing, styles.bottom, bottomPosition.getLayout(), { transform: [{ scale: bottomScale }] }]}
            {...bottomPanResponder.panHandlers}
          />
        )}
        {selectedFootwear && (
          <Animated.Image
            source={selectedFootwear}
            style={[styles.clothing, styles.footwear, footwearPosition.getLayout(), { transform: [{ scale: footwearScale }] }]}
            {...footwearPanResponder.panHandlers}
          />
        )}
        {selectedDress && (
          <Animated.Image
            source={selectedDress}
            style={[styles.clothing, styles.dress, dressPosition.getLayout(), { transform: [{ scale: dressScale }] }]}
            {...dressPanResponder.panHandlers}
          />
        )}
        {selectedBag && (
          <Animated.Image
            source={selectedBag}
            style={[styles.clothing, styles.bag, bagPosition.getLayout(), { transform: [{ scale: bagScale }] }]}
            {...bagPanResponder.panHandlers}
          />
        )}
        {selectedAccessories && (
          <Animated.Image
            source={selectedAccessories}
            style={[styles.clothing, styles.accessories, accessoriesPosition.getLayout(), { transform: [{ scale: accessoriesScale }] }]}
            {...accessoriesPanResponder.panHandlers}
          />
        )}
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('tops')} style={[styles.tab, activeTab === 'tops' && styles.activeTab]}>
          <Text style={styles.tabText}>Tops</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('bottoms')} style={[styles.tab, activeTab === 'bottoms' && styles.activeTab]}>
          <Text style={styles.tabText}>Bottoms</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('footwear')} style={[styles.tab, activeTab === 'footwear' && styles.activeTab]}>
          <Text style={styles.tabText}>Footwear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('dress')} style={[styles.tab, activeTab === 'dress' && styles.activeTab]}>
          <Text style={styles.tabText}>Dress</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('bag')} style={[styles.tab, activeTab === 'bag' && styles.activeTab]}>
          <Text style={styles.tabText}>Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('accessories')} style={[styles.tab, activeTab === 'accessories' && styles.activeTab]}>
          <Text style={styles.tabText}>Accessories</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        {activeTab === 'tops' && (
          <>
            {renderOptions(tops, setSelectedTop)}
            <View style={styles.sizeControlContainer}>
              <TouchableOpacity onPress={() => increaseSize(topScale)} style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decreaseSize(topScale)} style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {activeTab === 'bottoms' && (
          <>
            {renderOptions(bottoms, setSelectedBottom)}
            <View style={styles.sizeControlContainer}>
              <TouchableOpacity onPress={() => increaseSize(bottomScale)} style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decreaseSize(bottomScale)} style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {activeTab === 'footwear' && (
          <>
            {renderOptions(footwear, setSelectedFootwear)}
            <View style={styles.sizeControlContainer}>
              <TouchableOpacity onPress={() => increaseSize(footwearScale)} style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decreaseSize(footwearScale)} style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {activeTab === 'dress' && (
          <>
            {renderOptions(dress, setSelectedDress)}
            <View style={styles.sizeControlContainer}>
              <TouchableOpacity onPress={() => increaseSize(dressScale)} style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decreaseSize(dressScale)} style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {activeTab === 'bag' && (
          <>
            {renderOptions(bag, setSelectedBag)}
            <View style={styles.sizeControlContainer}>
              <TouchableOpacity onPress={() => increaseSize(bagScale)} style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decreaseSize(bagScale)} style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {activeTab === 'accessories' && (
          <>
            {renderOptions(accessories, setSelectedAccessories)}
            <View style={styles.sizeControlContainer}>
              <TouchableOpacity onPress={() => increaseSize(accessoriesScale)} style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decreaseSize(accessoriesScale)} style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  avatarContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    width: 200,
    height: 400,
    resizeMode: 'contain',
  },
  clothing: {
    position: 'absolute',
    width: 200,
    height: 400,
    resizeMode: 'contain',
  },
  top: {
    top: 0,
  },
  bottom: {
    top: 200,
  },
  footwear: {
    top: 350,
  },
  dress: {
    top: 100,
  },
  bag: {
    top: 50,
  },
  accessories: {
    top: 150,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tab: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#ccc',
  },
  tabText: {
    fontSize: 16,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionImage: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  sizeControlContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  sizeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 20,
    margin: 5,
  },
  sizeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AvatarCustomization;
