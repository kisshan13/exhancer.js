import exhancer from "exhancer";
import express from "express";

const exhapp = new exhancer.Exhancer();

exhapp.run(3000, () => {
    console.log("Exhancer running on port ::3000");
})