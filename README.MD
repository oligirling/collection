# My Private Collection

This is a private collection of images that I've collected over the years. I've decided to share them with the world because I think they're pretty special.

## Images

The images are all in the `public` directory.

## Information

This is a very simple React App that I built to display the images. I'm using Nginx in Dockerfile as it allows me to run the app on a public URL. This should be its own project but I'm too lazy to split it.

## Running the app locally

Running this locally uses docker (`docker-compose.local.yml`) and `npm run start` (see package.json). This command will build the app and start a containerized version and serve the app at `http://localhost:3000` using react-scripts. Super basic but perfect for local development.

To run it locally just run `docker-compose -f docker-compose.local.yml up --build` and go to `http://localhost:3000` in your browser. Prob wont need to run it with the build again after. 

You will be able to edit the files in the `src` and `public` directory and the changes will be reflected in the browser.

## Balena

Set this up using [Balena.io](https://dashboard.balena-cloud.com/devices/c6ac3c97ece16150b0c436bf42ff0582) that allows you to manage your Raspberry Pi. You can edit the files locally and push them to the Pi using Balena. It requires you to be online and the pi to both have internet access. I have already set up an account under my email - may want to change that. Login and you will seee a fleet. You will know which one to pick. Then you will see the device. 

To login before deploying, first run the following via CLI:

```
balena login
```

Which will open a webpage to login to Balena.

Once you have logged in, if you are ready to deploy to the Pi, ensure its plugged it and has internet access. You will see the device is online in the balena dashboard if it is. If it says heartbeat, its not properly connected and you could try restarting the Pi. 

Ready to deploy to it? You simply run `balena push daddys-secret-collection`. This will run the build and push to the Pi. You will see the status of the deployment in the dashboard. This uses the `docker-compose.yml` file.

## Browser on the Pi

In the `docker-compose.yml` file we are using an experimental browser. Its a little temperamental but it works. It allows you to view the app in a browser on the Pi. Find more information [here](https://github.com/balena-io-experimental/browser). I would recommend looking through the environement variables as they are useful. 

## Balena Information

Balena is great for managing your pi. It can also be a little annoying. Somethings i have noticed is that browser sometimes doesnt show the changes. This is because it doesnt refresh when you deploy. Its meant to redeploy both the application and they restart. But sometimes it doesnt. Just refresh the browser manually in the GUI. You can also see the logs in the GUI on the device.

### Balena Configuration

When you create a new application or you want to edit this private collection, the fleet and devices get set up with default configuration. It maybe best to change some of this. Head to the config of your fleet [here](https://dashboard.balena-cloud.com/fleets/2158377/config) and you can change a bunch of things. I have found the following things to be useful:

```
Define device GPU memory in megabytes. ## Default is 16, i would change this to be 128 or more depending on your use case.
```

If you want to make the browser full screen, set the custom configuration on the same page to:

```
RESIN_HOST_CONFIG_video=HDMI-A-1:1920x1080M@60
RESIN_HOST_CONFIG_disable_overscan=1
RESIN_HOST_CONFIG_hdmi_mode=82
RESIN_HOST_CONFIG_hdmi_group=1
RESIN_HOST_CONFIG_overscan_left=0
RESIN_HOST_CONFIG_overscan_right=0
RESIN_HOST_CONFIG_overscan_top=0
RESIN_HOST_CONFIG_overscan_bottom=0
```

^ I think this was for vertical screen.

### Useful commands

```
balena push daddys-secret-collection       # Push to the Pi
balena restart daddys-secret-collection    # Restart the Pi
balena logs daddys-secret-collection       # View the logs
balena ssh daddys-secret-collection        # SSH into the Pi
```

If you want to interact with docker once you are SSH'ed into the Pi, you can use the following command:

```
balena ssh daddys-secret-collection        # SSH into the Pi
```

then use `balena-engine` instead of `docker compose`

```
balena-engine ps
balena-engine logs <container_id>
balena-engine exec <container_id> <command>
```

### Setting the multiple wifi connections

In order to set up a new wifi connections, you need to duplicate the `balena-wifi-gavins-house` files, then move them to the pi.

When creating this, I set up my internet at home. But have added yours by creating a `balena-wifi-gavins-house` file then putting it on the pi. So you dont need to do anything now. But if you want to add more, you can follow below.

Attach the micro sd card to your computer using an sd card reader.

Then run the following commands to move the files from this dir to the pi, set the permissions:

```
FILE=balena-wifi-gavins-house && DIR=/Volumes/resin-boot/system-connections/ && sudo cp $FILE $DIR && sudo chown root:wheel ${DIR}$FILE && sudo chmod 600 ${DIR}$FILE
```

Eject the sd card from your computer then put it in the pi and power it on.

## Issues

Area here for random issues i noticed

- If you set a large background image (3mb+), browser crashes on the pi.