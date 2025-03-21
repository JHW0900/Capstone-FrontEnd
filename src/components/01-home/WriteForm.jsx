import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Pressable } from "react-native";
import { useToast } from "react-native-toast-notifications";
// import * as ImagePicker from "expo-image-picker";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { getCost } from "resources/js/common";
import { layout } from "resources/theme/layout";
import { Feather } from "@expo/vector-icons";

// IMPORT COMPONENTS
import Button from "components/common/Button";
import Label from "components/common/Label";
import Input from "components/common/Input";
import TextField from "components/common/TextField";
import ImagePicker from "components/common/ImagePicker";

const WriteForm = ({ onSubmit }) => {
  const toast = useToast();
  const [reqeust_img, setImage] = useState(null);
  const [request_title, setTitle] = useState("");
  const [request_content, setContent] = useState("");
  const [request_cost, setCost] = useState("");

  const handleSubmit = () => {
    if (!request_title || !request_content || !request_cost) {
      toast.show("모든 필드를 입력해주세요.", { type: "warning" });
      return;
    }

    const formData = new FormData();
    if (reqeust_img) {
      formData.append("image", {
        uri: reqeust_img.uri,
        type: reqeust_img.type,
        name: reqeust_img.fileName,
      });
    }
    formData.append("request_title", request_title);
    formData.append("request_content", request_content);
    formData.append("request_cost", request_cost);

    onSubmit(formData);
  };

  const handleImagePicker = async (resizedImage) => {
    setImage(resizedImage);
  };

  return (
    <View style={{ ...styles.container, height: layout().height }}>
      <ImagePicker
        style={{ width: layout().width, height: layout().width }}
        onOk={handleImagePicker}
      >
        <View style={styles.itemImg}>
          <Feather
            name="image"
            size={layout().width * 0.1}
            color="rgba(250, 250, 250, 0.5)"
          />
        </View>
      </ImagePicker>
      <View style={styles.inputContainer}>
        <Label text="제목" />
        <Input
          style={{ width: "100%" }}
          placeholder="제목을 입력해주세요"
          value={request_title}
          onChangeText={(text) => setTitle(text)}
          maxLength={20}
        />
      </View>
      <View style={styles.inputContainer}>
        <Label text="가격" />
        <Input
          style={{ width: "100%" }}
          placeholder="가격을 제시해주세요"
          value={getCost(request_cost)}
          onChangeText={(text) => {
            if (text.startsWith("0") && text.length > 1) {
              text = text.replace(/^0+/, "");
            }
            const cost = text.replace(/[^0-9]/g, "");
            setCost(cost);
          }}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Label text="내용" />
        <TextField
          style={{ width: "100%", height: 140 }}
          placeholder="내용을 입력해주세요"
          value={request_content}
          onChangeText={(text) => setContent(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Button
          style={{ marginTop: 15, marginBottom: 15 }}
          text="작성하기"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: theme["default-bg"],
  },
  itemImg: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,

    alignItems: "center",
    justifyContent: "center",
  },
  imagePicker: {
    backgroundColor: theme["default-btn"],
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginBottom: 10,
    marginRight: 20,
  },
  imagePickerText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
});

export default WriteForm;
