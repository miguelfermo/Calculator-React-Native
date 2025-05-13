import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, PaperProvider } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import Driver from './components/Driver';

export default function App() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState(null);

  const handlePress = (value) => {
    if (value === 'C') {
      setDisplay('');
      setResult(null);
    } else if (value === '=') {
      try {
        const calculateResult = () => {
          const operators = display.match(/[\+\-\*\/]/g);
          const numbers = display.split(/[\+\-\*\/]/).map(Number);

          if (!operators || numbers.some(isNaN)) {
            throw new Error('Invalid input');
          }

          let result = numbers[0];
          for (let i = 0; i < operators.length; i++) {
            switch (operators[i]) {
              case '+':
          result += numbers[i + 1];
          break;
              case '-':
          result -= numbers[i + 1];
          break;
              case '*':
          result *= numbers[i + 1];
          break;
              case '/':
          if (numbers[i + 1] === 0) {
            throw new Error('Division by zero');
          }
          result /= numbers[i + 1];
          break;
              default:
          throw new Error('Unknown operator');
            }
          }
          return result;
        };

        setResult(calculateResult());
      } catch (error) {
        setResult('Erro');
      }
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.display}>{result !== null ? result : display || '0'}</Text>
        <View style={styles.row}>
          {['7', '8', '9', '/'].map((val) => (
            <Button key={val} mode="contained" onPress={() => handlePress(val)} style={styles.button}>
              {val}
            </Button>
          ))}
        </View>
        <View style={styles.row}>
          {['4', '5', '6', '*'].map((val) => (
            <Button key={val} mode="contained" onPress={() => handlePress(val)} style={styles.button}>
              {val}
            </Button>
          ))}
        </View>
        <View style={styles.row}>
          {['1', '2', '3', '-'].map((val) => (
            <Button key={val} mode="contained" onPress={() => handlePress(val)} style={styles.button}>
              {val}
            </Button>
          ))}
        </View>
        <View style={styles.row}>
          {['C', '0', '=', '+'].map((val) => (
            <Button key={val} mode="contained" onPress={() => handlePress(val)} style={styles.button}>
              {val}
            </Button>
          ))}
        </View>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  display: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'right',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    margin: 5,
  },
});
