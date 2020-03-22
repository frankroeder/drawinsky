# Drawinsky

Create custom sketches to train your own [Quickdraw RNN](https://www.tensorflow.org/tutorials/sequences/recurrent_quickdraw)!
This web app saves drawings stroke by stroke. With this type of data, a recurrent
neural network can be trained to predict the process of drawing certain classes
of objects.

## Getting started

- Install dependencies with `npm i`
- Start app with `npm start`
- Open `http://localhost:4000`

### Docker

- `docker build --rm -t drawinsky .`
- `docker run --rm -it -p 4000:4000 drawinsky`

# References

- http://paperjs.org
- https://github.com/engelsjk/web-demo-quickdraw-visualizer
- https://github.com/googlecreativelab/quickdraw-dataset
