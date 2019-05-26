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

        final JsonElement jsonId= jsonObject.get("id");
        final Integer id = jsonId.getAsInt();

        final JsonElement jsonAuthor= jsonObject.get("author");
        final String author = jsonAuthor.getAsString();

        final Image image = new Image();

        image.setId(id);
        image.setAuthor(author);

        return image;
    }
}

