package com.example.kacper.infoviewer.Model;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;

import java.lang.reflect.Type;

public class ImageDeserializer implements JsonDeserializer<Image> {
    @Override
    public Image deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        final JsonObject jsonObject = json.getAsJsonObject();

        final JsonElement jsonPicText = jsonObject.get("pic_text");
        final String picText = jsonPicText.getAsString();

        final JsonElement jsonPic= jsonObject.get("pic");
        final String pic= jsonPic.getAsString();

        final JsonElement jsonAuthor = jsonObject.get("author");
        final Integer author = jsonAuthor.getAsInt();

        final Image image = new Image();

        image.setPicText(picText);
        image.setPic(pic);
        image.setAuthor(author);

        return image;
    }
}

