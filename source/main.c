#include <stdio.h>
#include <stdlib.h>

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

#include "methods_image.h"

int main()
{
    system("chcp 65001");
    system("cls");

    int width, height, channels;
    unsigned char *img = stbi_load("images/s_X.png", &width, &height, &channels, 1);
    if (img)
    {
        unsigned char *bin_img = img_binarization(img, width, height, 100);
        stbi_image_free(img);
        img = NULL;

        int n_w = 200;
        int n_h = 200;
        unsigned char *int_bin_img = img_interpolation(bin_img, width, height, n_w, n_h);
        free(bin_img);
        bin_img = NULL;

        for (int y = 0; y < n_h; y++)
        {
            for (int x = 0; x < n_w; x++)
                printf("%d", int_bin_img[y * n_w + x]);
            printf("\n");
        }

        free(int_bin_img);
    }

    system("pause");
    return NULL;
}