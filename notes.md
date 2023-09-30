
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




