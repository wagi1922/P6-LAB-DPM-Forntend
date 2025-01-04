import React, {useState} from "react";
import {Image, StyleSheet, Text, TextInput} from "react-native";
import {useRouter} from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ThemedView} from "@/components/ThemedView";
import {Dialog, PaperProvider, Portal} from "react-native-paper";
import API_URL from "../../config/config";
import { Button } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
            const { token } = response.data.data;
            await AsyncStorage.setItem("token", token);
            setDialogMessage("Login successful!");
            setIsSuccess(true);
            setDialogVisible(true);
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || "An error occurred";
            setDialogMessage(errorMessage);
            setIsSuccess(false);
            setDialogVisible(true);
        }
    };

    const handleDialogDismiss = () => {
        setDialogVisible(false);
        if (isSuccess) {
            router.replace("/(tabs)");
        }
    };

    return (
        <PaperProvider>
            <ThemedView style={styles.container}>
                <LinearGradient
                colors={['#C7FFD8', 'transparent']}
                style={styles.background}/>
                <Image source={require("../../assets/images/Focus-Time.png")} style={styles.logo} />
                <Text style={styles.title}>Belajar dengan fokus dan juga seru!</Text>
                <Text style={styles.subtitle}>Log in to continue</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button
                    title="Login"
                    buttonStyle={styles.buttonStyleLogin}
                    containerStyle={styles.buttonbox}
                    titleStyle={styles.loginButtonText}
                    onPress={handleLogin}/>
                <Button
                    title="Belum Punya Akun? Daftar sekarang"
                    buttonStyle={styles.buttonStyleSingUp}
                    containerStyle={styles.buttonbox}
                    titleStyle={styles.registerButtonText}
                    onPress={() => router.push("/auth/RegisterScreen")}/>
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={handleDialogDismiss}>
                        <Dialog.Title>{isSuccess ? "Success" : "Login Failed"}</Dialog.Title>
                        <Dialog.Content>
                            <Text>{dialogMessage}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={handleDialogDismiss}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ThemedView>
        </PaperProvider>        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: '#ffff',
    },
    logo: {
        width: 413,
        height: 103,
        marginBottom: 24,
        resizeMode: "contain",
        bottom: 40
    },
    title: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 24,
        color: "#666",
    },
    input: {
        width: 300,
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "regular",
    },
    registerButtonText: {
        color: "black",
        fontSize: 15,
        fontWeight: "regular",
    },
    buttonStyleLogin:{
        backgroundColor: '#161D6F',
        borderWidth: 2,
        borderColor: '#161D6F',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonStyleSingUp:{
        backgroundColor: '#98DED9',
        borderWidth: 2,
        borderColor: '#98DED9',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonbox:{
        width: 300,
        height:50,
        marginHorizontal: 50,
        marginVertical: 10,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
      },
});