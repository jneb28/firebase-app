<template>
    <div class="contact">
        <h1>Contact Form</h1>
        <v-container>
            <v-layout align-center justify-center row>
                <v-flex xs6>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    :counter="10"
                    label="Name"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    ></v-text-field>

                    <v-btn
                    :disabled="!valid"
                    @click="submit"
                    >
                    submit
                    </v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
