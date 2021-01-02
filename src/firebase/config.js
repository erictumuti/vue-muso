import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
	apiKey: "AIzaSyC6Yulq-0EHqW-2_HADkfkdRlHQrem0LwE",
	authDomain: "vue-muso.firebaseapp.com",
	projectId: "vue-muso",
	storageBucket: "vue-muso.appspot.com",
	messagingSenderId: "278527480581",
	appId: "1:278527480581:web:047022065d2a20fdb19d6c"
  };

//   init firebase
  firebase.initializeApp(firebaseConfig)

//   init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp


export { projectFirestore, projectAuth, projectStorage, timestamp }
