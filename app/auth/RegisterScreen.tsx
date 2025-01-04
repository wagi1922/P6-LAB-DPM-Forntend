import React, {useState} from "react";
import {StyleSheet, Text, TextInput} from "react-native";
import {useRouter} from "expo-router";
import axios from "axios";
import {ThemedView} from "@/components/ThemedView";
import {Dialog, PaperProvider, Portal} from "react-native-paper";
import API_URL from "../../config/config";
import { Button } from '@rneui/themed';

export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        try {
            await axios.post(`${API_URL}/api/auth/register`, {username, password, email});
            router.replace("/auth/LoginScreen");
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || "An error occurred";
            setDialogMessage(errorMessage);
            setDialogVisible(true);
        }
    };

    return (
        <PaperProvider>
            <ThemedView style={styles.container}>
                <Text style={styles.title}>Create an Account</Text>
                <Text style={styles.subtitle}>Join us and get started</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
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
                    title="Sing UP"
                    buttonStyle={styles.buttonStyleLogin}
                    containerStyle={styles.buttonbox}
                    titleStyle={styles.loginButtonText}
                    onPress={handleRegister}/>
                <Button
                    title="LOG IN"
                    buttonStyle={styles.buttonStyleSingUp}
                    containerStyle={styles.buttonbox}
                    titleStyle={styles.registerButtonText}
                    onPress={() => router.push("/auth/LoginScreen")}/>
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                        <Dialog.Title>Registration Failed</Dialog.Title>
                        <Dialog.Content>
                            <Text>{dialogMessage}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setDialogVisible(false)}>OK</Button>
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
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 24,
    },
    input: {
        width: "100%",
        height: 48,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
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
});