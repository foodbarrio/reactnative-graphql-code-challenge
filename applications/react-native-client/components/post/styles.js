import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  author: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 16
  },
  meta: {
    marginHorizontal: 8,
    justifyContent: "center"
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24
  },
  timestamp: {
    opacity: 0.5,
    fontSize: 14,
    lineHeight: 21
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24
  },
  title: {
    fontWeight: "bold",
    fontSize: 36,
    marginVertical: 8,
    marginHorizontal: 16
  },
  reactions: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 8,
    marginHorizontal: 16
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
    marginHorizontal: 16
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32
  },
  icon: {
    flex: 1
  }
});

export default styles;
