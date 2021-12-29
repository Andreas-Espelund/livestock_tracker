##Relasjoner
IndividualsID,birthdate, gender, status, father, mother, weight, bottle, name)
Medicine(name)
Fields(name)
Administered(id, medicine)

##Fremmednøkler
Administered(id) -> Individual(id)
Administered(medicine) -> Medicine(name)

