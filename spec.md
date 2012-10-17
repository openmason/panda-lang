# Introduction

## Variables
 * any string is mushtache compliant
 * $ is the current context
 * anytime one assigns something to _, its an emit

## Lambdas

Inline functions can be written as

    f(<=0):=1;  (or) 
    f(n<=0):=1; (or)
    f(n):=n*f(n-1);

## Functions
Full scale functions can be written as 

    f(n) {
      r=[1..n];
      prod=1;
      r -> prod*=$;
      // (or)
      // r => prod*=$;
      return prod;
    }

## Comments
Javascritp/C/C++/Java style comments apply

## Serial, Parallel calls

### Calling with a list

   r=[1..n];
   r -> do something in sequence;
   r => do something in parallel;
   // $ is the current element from the context
   // -> sequential operator
   // => parallel operator

### Results & Assignment

    a <- [1,2,3];  // will return 1, 2, 3 
    // (equivalnt to)
    a = [1,2,3];   // easy to understand
    // (equivalent to)
    a = [1,2,3] -> _ = $;

Another example with multiple functions

    //a <- [1,2,3];  // will return 1, 2, 3 
    equivalnt to 
    a = [1,2,3]
    equivalent to
    a = [1,2,3] -> _ = $;
    
    // call x,y,z in sequence and store the result in b (order of results is as given)
    b <- [x(n),y(n),z(n)];
    // call x,r,z in parallel and store the result in c (order of result is unpredictable)
    c <= [x(3), r(33), z(99)]


## Datastructures

#### Split

    numbers=[300,4,6,8];
    a,b=numbers<<2; // assign 300,4
