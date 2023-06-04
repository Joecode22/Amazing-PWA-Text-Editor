// Import the necessary function from the idb package
import { openDB } from 'idb';

// Define a function to initialize the database
const initdb = async () => {
  // Use the openDB function from idb to create a new database
  // or open an existing one, with the name 'jate' and version 1
  await openDB('jate', 1, {
    // In the upgrade callback, we define the structure of our database
    upgrade(db) {
      // If the database already has an object store named 'jate', we don't need to do anything
      if (!db.objectStoreNames.contains('jate')) {
        // If not, we create an object store named 'jate' 
        // We don't specify a keyPath or autoIncrement, because we're only storing a single item
        db.createObjectStore('jate');
      }
    },
  });
};

// Export a function we will use to save data to the database
export const putDb = async (content) => {
  // Open the 'jate' database
  const db = await openDB('jate', 1);

  // Start a transaction with readwrite access to the 'jate' object store
  const tx = db.transaction('jate', 'readwrite');

  // Access the 'jate' object store
  const store = tx.objectStore('jate');

  // Store the content using the key 'content'
  // This overwrites any previous value stored under the same key
  await store.put(content, 'content');
};

// Export a function to get data from the database
export const getDb = async () => {
  // Open the 'jate' database
  const db = await openDB('jate', 1);

  // Start a transaction with readonly access to the 'jate' object store
  const tx = db.transaction('jate', 'readonly');

  // Access the 'jate' object store
  const store = tx.objectStore('jate');

  // Get the data stored under the key 'content'
  const content = await store.get('content');

  // Return the retrieved content
  return content;
};

// Call the initdb function to initialize the database when the module is loaded
initdb();
