package com.example.kacper.infoviewer.Model;

public class Image {

    private String picText;
    private String pic;
    private Integer author;

    public Image() {
    }

    public Image(String picText, String pic, Integer author) {

        this.picText = picText;
        this.pic = pic;
        this.author = author;
    }

    public String getPicText() {
        return picText;
    }

    public void setPicText(String picText) {
        this.picText = picText;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public Integer getAuthor() {
        return author;
    }

    public void setAuthor(Integer author) {
        this.author = author;
    }
}
