import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, Platform} from 'react-native';
import Icon from './Icon';

export default class Banner extends Component {
    static defaultProps = {
        title: '',
        icon: '',
        switchScreen: undefined,
        logOut: undefined,
    }

    render() {
        return (
            <View style={[styles.banner, Platform.OS === 'ios' ? { paddingTop: 30 } : { paddingTop: 25 }]}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <TouchableOpacity style={styles.iconContainer}
                    onPress={this.props.switchScreen}>
                    <Icon
                        style={styles.icon}
                        color='white'
                        name={this.props.icon}
                        size={30}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>{this.props.title}</Text>
                <TouchableOpacity style={styles.iconContainer}
                    onPress={this.props.logOut}>
                    <Icon
                        style={styles.icon}
                        color='white'
                        name='log-out'
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#51A4F7',
        flexDirection: 'row',
    },
    headerText: {
        flexDirection: 'row',
        flex: 1,
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        justifyContent: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    iconContainer: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#51A4F7',
        borderRadius: 10,
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
});