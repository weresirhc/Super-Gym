import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { format } from 'date-fns';
import QRCode from 'react-native-qrcode-svg';

export default function App() {
  // State to store the values entered by the user for each exercise
  const [benchPressValue, setBenchPressValue] = useState('');
  const [squatValue, setSquatValue] = useState('');
  const [deadliftValue, setDeadliftValue] = useState('');

  // State to store recorded entries
  const [recordedEntries, setRecordedEntries] = useState([]);

//To add jason ues for QR code values
  const qrValue = JSON.stringify({
    benchPress: benchPressValue,
    squat: squatValue,
    deadlift: deadliftValue,
  });
  
// Function to format timestamp with default format (month, day, and time in 12-hour format)
const formatTimestamp = (timestamp) => {
  return format(new Date(timestamp), 'MMM dd, hh:mm a');
};
  // Function to handle recording an entry
  const recordEntry = (exercise, value) => {
    const timestamp = new Date().toISOString(); // Get current timestamp
    const newEntry = { exercise, value, timestamp };
    setRecordedEntries([...recordedEntries, newEntry]); // Add new entry to the recordedEntries array
  };

  return (
    
  
    <SafeAreaView style={styles.container}>
      {/* Table Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Exercise</Text>
        <Text style={styles.headerText}>Value</Text>
      </View>

      {/* Rows for Bench Press, Squat, and Deadlift */}
      <View style={styles.row}>
        <Text style={styles.exerciseText}>Bench Press</Text>
        <TextInput
          style={styles.input}
          value={benchPressValue}
          onChangeText={setBenchPressValue}
          keyboardType="numeric"
          onBlur={() => {
            recordEntry('Bench Press', benchPressValue);
            setBenchPressValue('');
          }}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.exerciseText}>Squat</Text>
        <TextInput
          style={styles.input}
          value={squatValue}
          onChangeText={setSquatValue}
          keyboardType="numeric"
          onBlur={() => {
            recordEntry('Squat', squatValue);
            setSquatValue('');
          }}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.exerciseText}>Deadlift</Text>
        <TextInput
          style={styles.input}
          value={deadliftValue}
          onChangeText={setDeadliftValue}
          keyboardType="numeric"
          onBlur={() => {
            recordEntry('Deadlift', deadliftValue);
            setDeadliftValue('');
          }}
        />
      </View>

            {/* QR Code Display */}
    <View style={styles.qrCodeContainer}>
      <QRCode
        value={qrValue}
        size={100} // ize o QR code
      />
    </View>


      {/* Display recorded entries */}
      <View style={styles.recordedEntries}>
        <Text style={styles.recordedEntriesHeader}>Recorded Entries</Text>
        <FlatList
  data={recordedEntries}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.recordedEntry}>
      <Text>{item.exercise}: {item.value}</Text>
      <Text>{formatTimestamp(item.timestamp)}</Text>
    </View>
  )}
/>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  exerciseText: {
    fontSize: 20, 
  },
  input: {
    width: '40%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    fontSize: 12,
  },
  recordedEntries: {
    marginTop: 20,
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  recordedEntriesHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  recordedEntry: {
    marginBottom: 4,
  },
});
