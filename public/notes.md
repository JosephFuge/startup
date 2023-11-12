
# Notes

## GitHub Assignment

- The "git fetch" command allows you to pull down changes from the origin branches so you can then compare and merge them into your local versions of the same branches.
- Forks are local copies of a repo, particularly one that you don't own or have direct editing access to. 
- Pull requests are how you can submit suggested changes to a forked repo or simply to another branch within a repo.


## AWS EC2 Assignment
Public IP Address: 3.223.171.18

### Associate a permanent IP address with your EC2 instance
Will cause you to be charged for time the server is *not* running (your first elastic IP address is otherwise free)

1. Open the AWS console in your browser and log in.
2. Navigate to the EC2 service.
3. From the menu on the left select Network & Security|Elastic IPs.
4. Press the Allocate Elastic IP address button.
5. Press the Allocate button.
6. Select the newly displayed allocated address and press the Actions button.
7. Select the Associate Elastic IP address option.
8. Click on the Instance box and select your server instance.
9. Press Associate.

Basic HTML document structure:
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <main>
      <p>Hello world</p>
    </main>
  </body>
</html>

## Simon HTML Assignment

### SVG Paths
Preceding with the M letter inside the 'd' attribute of the path tag (which goes inside the svg tag) tells the path to "Move to" the proceding coordinates with straight lines

Preceding with the Q letter tells it to form a quadratic curve from the first coordinates that follow to the second ones

Preceding with the T letter tells it to form a smooth quadratic curve

### Bash script
Get commandline arguments with:
while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

Note that the above script does not include validation

Use the double less-than << operator to assign whatever is on the lefthand side to end when it encounters what's on the right-hand side, in this example to end the ssh session:
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}/public
mkdir -p services/${service}/public
ENDSSH

Use the $ sign to reference command-line arguments

## StartUp HTML Assignment

### Inputs
formaction attribute of inputs can override what it does (allowing you to redirect to other html pages)
placeholder attribute of inputs can put hint text in the "text" and "password" input types

### SVGs
You can create your own custom SVG with a website like https://uxwing.com/svg-icon-editor/ and import it directly into your html
Be careful about the original size of the SVG, this is not easy to change

## Simon CSS & Practice CSS Assignments

### Animation

Bare minimum is to put the "animation-name" and "animation-duration" properties in the CSS ruleset of the element you are animating.

Then, using the same name entered for the animation-name, create keyframes:
@keyframes slider {
  from {
    transform: translateX(-1000px);
  }

  to {
    transform: translateX(0px);
  }
}

Besides just "from" and "to", you can add frames using percentages.
Use transform: rotate(xdeg) to rotate however many degrees desired

Preserve the last frame of the animation (great for using on :hover animations):
animation-fill-mode: forwards ;

### Flex

Achieve relative sizing with:

display: flex;
flex-direction: column; (or row)

Then, in child elements, specify a flex amount:

flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;

For example, you can set the footer to the bottom by making the whole body display: flex, then giving the footer the following property:
margin-top: auto;

### Grid

Lay elements out in a grid. Grid can adjust number of elements per row with the right properties.

Example: 
"We want all rows to be exactly 300 pixels high with the grid-auto-rows property and the use the grid-gap property to say that we want at least a 1 em gap between our grid items:

.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}"

### Media Query

Change CSS rulesets based on details of the display (i.e. size, orientation)

@media (max-width: 800px) {
  .flex-item-right, .flex-item-left {
    flex: 100%;
  }
}

i.e. orientation: landscape

## Startup CSS Assignment

### Linear Gradients

With the following attributes in the header ruleset:

border-bottom: 5px solid;
border-image: linear-gradient(45deg, #0863a0, 10%, #27363e 80%) 1;

I can create a gradient border at full strength at the left fading to half strength by the time I get 10% of the way there, and then all the way to the final color by the time I'm at 80% across.


## JavaScript

### Promises and Async/Await

Example:

```const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 10000);
});
```
We then chain the then, catch and finally functions to the coinToss object in order to handle each of the possible results.

```coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

// OUTPUT:
//    Coin toss result: tails
//    Toss completed```
