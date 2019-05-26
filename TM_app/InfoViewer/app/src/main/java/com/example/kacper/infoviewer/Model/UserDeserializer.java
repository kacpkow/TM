package com.example.kacper.infoviewer.Model;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;

import java.lang.reflect.Type;

public class UserDeserializer implements JsonDeserializer<User> {
    @Override
    public User deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        final JsonObject jsonObject = json.getAsJsonObject();

        final JsonElement jsonModel = jsonObject.get("model");
        final String model = jsonModel.getAsString();

        final JsonElement jsonPk = jsonObject.get("pk");
        final Integer pk = jsonPk.getAsInt();

        final JsonElement jsonField = jsonObject.get("fields");
        final JsonObject fieldsJson = jsonField.getAsJsonObject();

        final JsonElement jsonUsername= fieldsJson.get("username");
        final String username = jsonUsername.getAsString();

        final JsonElement jsonFirstName = fieldsJson.get("first_name");
        final String firstName = jsonFirstName.getAsString();

        final JsonElement jsonLastName = fieldsJson.get("last_name");
        final String lastName = jsonLastName.getAsString();

        final JsonElement jsonEmail= fieldsJson.get("email");
        final String email = jsonEmail.getAsString();

        final User.Fields fields = new User.Fields();

        fields.setUsername(username);
        fields.setFirst_name(firstName);
        fields.setLast_name(lastName);
        fields.setEmail(email);

        final User user = new User();

        user.setModel(model);
        user.setPk(pk);
        user.setFields(fields);

        return user;
    }
}

