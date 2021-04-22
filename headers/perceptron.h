#include <stdio.h>
#include <stdlib.h>
#include <math.h>

struct neuron
{
    float sum;
    float value;
};

struct layer
{
    struct neuron *neurons;
    float *weights;
};

float sigmoid(float);
float derivative_sigmoid(float);
