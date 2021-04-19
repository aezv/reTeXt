cmake_minimum_required(VERSION 3.19)

project(re_math VERSION 0.1 LANGUAGES C CXX)

message("
Includes:
    stb_image.h
    methods_image.h
")
include_directories(headers)

message("
Source:
    main.c
    methods_image.c
")
add_executable(re_math source/main.c)
target_sources(re_math PUBLIC source/methods_image.c)
