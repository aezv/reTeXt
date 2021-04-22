#include "perceptron.h"

float sigmoid(float sum)
{
    return 1 / (1 + exp(-sum));
}

float derivative_sigmoid(float sigmoid)
{
    return sigmoid * (1 - sigmoid);
}
