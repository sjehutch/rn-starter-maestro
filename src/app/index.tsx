import { Button } from "@components/Button";
import { TextField } from "@components/TextField";
import { useAppTheme } from "@shared/theme/useAppTheme";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * HomeScreen
 * Like you're 10:
 * - This is a big scrollable page that shows lots of common UI controls.
 * - We keep little pieces of "memory" (state) for switches, inputs, modal open/close, etc.
 * - When you tap buttons, we either do nothing, show an alert, open a modal, or navigate.
 */
export const HomeScreen = () => {
  // Theme is your "colors dictionary" (like MAUI resource dictionary),
  // except it changes automatically for dark/light mode.
  const theme = useAppTheme();

  // Expo Router "navigator" (like Shell navigation-ish).
  // router.push("/login") = go to login screen.
  const router = useRouter();

  // These are all little on/off or text values the screen remembers.
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isPromotionsEnabled, setIsPromotionsEnabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Pull-to-refresh state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Loading state for the "Simulate Action" button
  const [isActionInProgress, setIsActionInProgress] = useState(false);

  // Text input state
  const [userNameInput, setUserNameInput] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // A tiny "segmented control" state (Day/Week/Month)
  const [selectedSegment, setSelectedSegment] = useState<
    "Day" | "Week" | "Month"
  >("Day");
  const segmentOptions: Array<"Day" | "Week" | "Month"> = [
    "Day",
    "Week",
    "Month",
  ];

  /**
   * We build this once so each section has consistent styling.
   * Like you're 10:
   * - It’s a "card" look: padding, border, rounded corners.
   * - Theme colors keep it readable in dark/light mode.
   */
  const sectionStyle = [
    styles.section,
    { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
  ];

  /**
   * Pull-to-refresh handler.
   * Like you're 10:
   * - We show the spinner for a tiny time to pretend we refreshed.
   */
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  /**
   * "Simulate Action" handler (fake loading).
   * Like you're 10:
   * - If we’re already loading, ignore extra taps.
   * - Turn loading on, wait, turn loading off.
   */
  const handleActionPress = () => {
    if (isActionInProgress) {
      return;
    }

    setIsActionInProgress(true);
    setTimeout(() => {
      setIsActionInProgress(false);
    }, 1200);
  };

  return (
    <ScrollView
      // This controls layout INSIDE the ScrollView (like "StackLayout spacing + padding").
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
      // Pull-to-refresh control (works like a native refresh gesture).
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor={theme.colors.primary}
        />
      }
    >
      {/* Page title */}
      <Text style={[styles.title, { color: theme.colors.text }]}>
        UI Control Showcase
      </Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        A scrollable gallery of interactive React Native controls.
      </Text>

      {/* =====================
          Buttons Section
         ===================== */}
      <View style={sectionStyle}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Buttons
        </Text>

        {/* Simple custom button */}
        <Button title="Primary Button" onPress={() => {}} />

        {/* Two native touchables side-by-side */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.chip, { backgroundColor: theme.colors.border }]}
            onPress={() => {}}
          >
            <Text style={[styles.chipText, { color: theme.colors.text }]}>
              TouchableOpacity
            </Text>
          </TouchableOpacity>

          <TouchableHighlight
            style={[styles.chip, { backgroundColor: theme.colors.border }]}
            underlayColor={theme.colors.card}
            onPress={() => {}}
          >
            <Text style={[styles.chipText, { color: theme.colors.text }]}>
              TouchableHighlight
            </Text>
          </TouchableHighlight>
        </View>

        {/* Pressable with a "pressed" style (like a visual feedback state) */}
        <Pressable
          style={({ pressed }) => [
            styles.pressableCard,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
            },
            pressed && styles.pressableCardPressed,
          ]}
          onPress={() => {}}
        >
          <Text style={[styles.pressableText, { color: theme.colors.text }]}>
            Pressable Card
          </Text>
        </Pressable>

        {/* This is the important one for Maestro:
            - testID MUST be forwarded by your Button component.
            - Also Button should set accessibilityLabel so automation can "see" it.
        */}
        <Button
          title="Show Alert"
          testID="alertButton"
          onPress={() => Alert.alert("Hello", "This is a simple alert.")}
        />
      </View>

      {/* =====================
          Text Inputs Section
         ===================== */}
      <View style={sectionStyle}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Text Inputs
        </Text>

        {/* Your custom TextField (label + error) */}
        <TextField
          label="Username"
          value={userNameInput}
          onChangeText={setUserNameInput}
          autoCapitalize="none"
          // Quick demo: show an error when username is too short
          errorMessage={userNameInput.length < 3 ? "Too short" : undefined}
        />

        {/* A raw TextInput (native primitive) */}
        <TextInput
          style={[
            styles.nativeInput,
            { color: theme.colors.text, borderColor: theme.colors.border },
          ]}
          placeholder="Native TextInput"
          placeholderTextColor="#9CA3AF"
          value={searchInput}
          onChangeText={setSearchInput}
        />
      </View>

      {/* =====================
          Toggles Section
         ===================== */}
      <View style={sectionStyle}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Toggles
        </Text>

        <View style={styles.row}>
          <Text style={[styles.text, { color: theme.colors.text }]}>
            Notifications
          </Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
          />
        </View>

        <View style={styles.row}>
          <Text style={[styles.text, { color: theme.colors.text }]}>
            Promotions
          </Text>
          <Switch
            value={isPromotionsEnabled}
            onValueChange={setIsPromotionsEnabled}
          />
        </View>
      </View>

      {/* =====================
          Segmented Control Section
         ===================== */}
      <View style={sectionStyle}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Segmented Control
        </Text>

        <View style={styles.segmentedControl}>
          {segmentOptions.map((segmentLabel) => {
            const isSelected = selectedSegment === segmentLabel;

            return (
              <Pressable
                key={segmentLabel}
                style={[
                  styles.segmentButton,
                  {
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.border,
                  },
                ]}
                onPress={() => setSelectedSegment(segmentLabel)}
              >
                <Text
                  style={[
                    styles.segmentText,
                    { color: isSelected ? "#FFFFFF" : theme.colors.text },
                  ]}
                >
                  {segmentLabel}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* =====================
          Indicators Section
         ===================== */}
      <View style={sectionStyle}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Indicators
        </Text>

        <View style={styles.row}>
          <ActivityIndicator color={theme.colors.primary} />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Badge</Text>
          </View>
        </View>
      </View>

      {/* =====================
          Media Section
         ===================== */}
      <View style={sectionStyle}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Media
        </Text>

        <Image
          style={styles.heroImage}
          source={{ uri: "https://picsum.photos/800/400" }}
        />
      </View>

      {/* =====================
          Modal Section
         ===================== */}
      <View style={sectionStyle}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Modal
        </Text>
        <Button title="Open Modal" onPress={() => setIsModalVisible(true)} />
      </View>

      {/* =====================
          Navigation Section
         ===================== */}
      <View style={sectionStyle}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Navigation
        </Text>
        <Button
          title="Go to Login Screen"
          onPress={() => router.push("/login")}
        />
      </View>

      {/* =====================
          Loading Button Section
         ===================== */}
      <View style={sectionStyle}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Loading Button
        </Text>
        <Button
          title="Simulate Action"
          onPress={handleActionPress}
          loading={isActionInProgress}
          disabled={isActionInProgress}
        />
      </View>

      {/* =====================
          Modal Sheet UI
         ===================== */}
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        {/* Backdrop closes modal when tapped */}
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setIsModalVisible(false)}
        >
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Modal Sheet
            </Text>
            <Text style={[styles.text, { color: theme.colors.text }]}>
              Tap outside to close.
            </Text>
            <Button
              title="Close Modal"
              onPress={() => setIsModalVisible(false)}
            />
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
  },
  section: {
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
  },
  pressableCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  pressableCardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  pressableText: {
    fontSize: 16,
    fontWeight: "600",
  },
  nativeInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#111827",
  },
  badgeText: {
    color: "#F9FAFB",
    fontSize: 12,
    fontWeight: "700",
  },
  segmentedControl: {
    flexDirection: "row",
    gap: 8,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },
  segmentText: {
    fontSize: 14,
    fontWeight: "700",
  },
  heroImage: {
    width: "100%",
    height: 160,
    borderRadius: 16,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(17, 24, 39, 0.45)",
  },
  modalCard: {
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    gap: 12,
  },
});

// Expo Router needs a default export for route files.
export default HomeScreen;
