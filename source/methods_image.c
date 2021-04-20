#include "methods_image.h"

unsigned char *img_binarization(unsigned char *img, int width, int heigth, unsigned char threshold)
{
    unsigned char *bin_image = malloc(sizeof(unsigned char) * width * heigth);
    for (int i = 0; i < width * heigth; i++)
        bin_image[i] = img[i] <= threshold ? 1 : 0;
    return bin_image;
}

unsigned char *img_interpolation(unsigned char *img, int width, int height, int new_width, int new_height)
{
    unsigned char *new_img = malloc(sizeof(unsigned char) * new_width * new_height);
    float scale_y = (float)(height - 1) / (float)(new_height - 1);
    float scale_x = (float)(width - 1) / (float)(new_width - 1);
    for (int y = 0; y < new_height; y++)
    {
        int interpolation_y = (int)round((float)y * scale_y);
        for (int x = 0; x < new_width; x++)
        {
            int interpolation_x = (int)round((float)x * scale_x);
            new_img[y * new_width + x] = img[interpolation_y * width + interpolation_x];
        }
    }
    return new_img;
}
