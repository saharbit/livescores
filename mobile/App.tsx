import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-community/google-signin";
import { useQuery } from "@apollo/client";
import { GET_DEFAULT_FIXTURES } from "./queries";

GoogleSignin.configure({
    webClientId: "1009741899248-898m2fstrg4cjtsnspa7emh41jdhhins.apps.googleusercontent.com",
});

const App = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<null | { email: string }>();
    const { loading, error, data } = useQuery(GET_DEFAULT_FIXTURES);

    function onAuthStateChanged(user: any) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        return subscriber;
    }, []);

    async function onGoogleButtonPress() {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            return auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.error(error);
        }
    }

    function GoogleSignIn() {
        return (
            <Button
                title="Google Sign-In"
                onPress={() => onGoogleButtonPress().then(() => console.log("Signed in with Google!"))}
            />
        );
    }

    if (initializing) return null;

    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <GoogleSignIn />
            </View>
        );
    }

    function signOut() {
        return auth()
            .signOut()
            .then(() => console.log("User signed out!"));
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Welcome {user.email}</Text>
            <Button title="Sign out" onPress={() => signOut()} />
        </View>
    );
};

export default App;
