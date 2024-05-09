#include <stdio.h>

int main() {
    int num, i = 1;
    long fact = 1;

    printf("Enter a positive number: ");
    scanf("%d", &num);

    if (num <= 0) {
        printf("Invalid number!\n");
    } else {
        do {
            fact *= i;
            i++;
        } while (i <= num);
        printf("Factorial = %ld\n", fact);
    }

    return 0;
}

#include <stdio.h>

int main() {
    int num, i = 1;
    long fact = 1;

    printf("Enter any number: ");
    scanf("%d", &num);

    if (num <= 0) {
        printf("Invalid number!\n");
    } else {
        while (i <= num) {
            fact *= i;
            i++;
        }
        printf("Factorial = %ld\n", fact);
    }

    return 0;
}


#include <stdio.h>

int main() {
    int num, f = 1;

    printf("Enter a number: ");
    scanf("%d", &num);

    for (int i = 1; i <= num; i++) {
        f *= i;
    }

    printf("Factorial of %d = %d\n", num, f);
    return 0;
}
