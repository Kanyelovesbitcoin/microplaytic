import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../theme';

interface PhotoUploadScreenProps {
  onComplete: (photos: string[]) => void;
}

export const PhotoUploadScreen: React.FC<PhotoUploadScreenProps> = ({ onComplete }) => {
  const [photos, setPhotos] = useState<string[]>([]);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photos');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    if (photos.length >= 6) {
      Alert.alert('Maximum Reached', 'You can upload up to 6 photos');
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (photos.length < 3) {
      Alert.alert('More Photos Needed', 'Please add at least 3 photos');
      return;
    }
    onComplete(photos);
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={3} totalSteps={7} />

      <View style={styles.content}>
        <Text style={styles.title}>Add your photos</Text>
        <Text style={styles.subtitle}>
          Upload at least 3 photos. Show your personality!
        </Text>

        <View style={styles.photoGrid}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <TouchableOpacity
              key={index}
              style={styles.photoSlot}
              onPress={() => (photos[index] ? removePhoto(index) : pickImage())}
              activeOpacity={0.7}
            >
              {photos[index] ? (
                <>
                  <Image source={{ uri: photos[index] }} style={styles.photo} />
                  <View style={styles.removeButton}>
                    <Text style={styles.removeButtonText}>×</Text>
                  </View>
                </>
              ) : (
                <View style={styles.addPhotoButton}>
                  <Text style={styles.addPhotoText}>+</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.hint}>
          {photos.length}/6 photos • {Math.max(0, 3 - photos.length)} more required
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={photos.length < 3}
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing['2xl'],
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  photoSlot: {
    width: '30%',
    aspectRatio: 3 / 4,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: theme.colors.backgroundTertiary,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  addPhotoButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
  },
  addPhotoText: {
    fontSize: 40,
    color: theme.colors.textTertiary,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 24,
  },
  hint: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
});
