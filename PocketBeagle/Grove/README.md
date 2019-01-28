# Grove modules

This is a set of examples for using Seeed Grove modules with PocketBeagle, primarily using
the BeagleBoard.org PocketBeagle Grove Cape, but some other wiring options are examined as
well.

# BeagleBoard.org PocketBeagle Grove Cape

## I2C1/I2C2

To use these ports as 3.3V I2C, the default configuration should be ready-to-go. Depending
on the sensor you are using, you'll simply need to enable the kernel driver and interact
using the newly created SYSFS entries. This is easy and can be quickly learned by example.

Take the [Grove time of flight distance sensor](http://wiki.seeedstudio.com/Grove-Time_of_Flight_Distance_Sensor-VL53L0X/)
as a first example. As long as the kernel is new enough or the module is installed, you'll
simply need to write to a file called ```/sys/bus/i2c_devices/i2c-2/new_device``` to
trigger the loading of the driver, assuming you've connected it to I2C2. Swap i2c-2 with
i2c-1 if you've connected it to I2C1. What you'll need to write is the string ```vl53l0x 0x29```.
This is the device driver name and the I2C address of the device on the Grove module.

In this directory, you'll find numerous examples in various programming languages to
perform this task, but you can also simply do everything necessary from the Linux
command shell. You'll see the shell in your Cloud9 IDE window as 'bash'. Simply type
in these two lines to read from the time of flight sensor.

```sh
echo vl53l0x 0x29 | sudo tee /sys/bus/i2c/devices/i2c-2/new_device
cat /sys/bus/iio/devices/iio\:device1/in_distance_raw
```

The first line loads the driver and the second line reads the sensor. If you have more
sensor drivers loaded, the ```iio:device1``` might be incremented to ```iio:device2```
or whatever the next available index is.

To read it continuously, you can do something like:

```sh
watch -n0 cat /sys/bus/iio/devices/iio\:device1/in_distance_raw
```

The summary of SYSFS entries (virtual files) providing an interface to the module are
documented at https://www.kernel.org/doc/Documentation/ABI/testing/sysfs-bus-iio.  You
should look for the interfaces typical for the type of sensor.

The following table provides a summary of I2C sensors, the name of the driver, the
default I2C address, and the minimal kernel revision to support the sensor. The kernel
version also includes a link to the kernel module source code.

| Module name and wiki link | Driver name | Address | Kernel version and link to driver source |
| --- | --- | --- | --- |
| [Time of flight sensor](http://wiki.seeedstudio.com/Grove-Time_of_Flight_Distance_Sensor-VL53L0X/) | vl53l0x | 0x29 | [TBD](https://github.com/beagleboard/cloud9-examples/tree/master/PocketBeagle/Grove/VL53L0X) |

# [mikroBus Grove Adapter](https://www.tindie.com/products/pmunts/mikrobus-grove-adapter-3/)

### ANA
* 