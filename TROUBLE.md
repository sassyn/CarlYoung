# DevOps challenge for Spot.IM

I found no TROUBLE in making the code. The only issues I suffers along the dev process was with travis:

1. At first I didn't use the sudo option in .travis.yml and the test was failed to run. Once I enable it everything was OK.
2. Query the test result during a running test in travis gave me a timeout. This is logic as the code can determine the status results while it was running. As a result the /health status test is not included in travis.
