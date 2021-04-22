cmake_minimum_required(VERSION 3.19)

project(reTeXt VERSION 0.1 LANGUAGES C CXX)

message("
Includes:
    stb_image.h
    methods_image.h
    perceptron.h
")
include_directories(headers)

message("
Source:
    main.c
    methods_image.c
    perceptron.c
")
add_executable(reTeXt source/main.c)
target_sources(reTeXt PUBLIC source/methods_image.c)
target_sources(reTeXt PUBLIC source/perceptron.c)
